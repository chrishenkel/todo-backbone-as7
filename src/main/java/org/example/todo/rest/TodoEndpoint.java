package org.example.todo.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import org.example.todo.model.Todo;
import org.example.todo.rest.dto.TodoDTO;

/**
 * 
 */
@Stateless
@Path("/todos")
public class TodoEndpoint
{
   @PersistenceContext(unitName = "primary")
   private EntityManager em;

   @POST
   @Consumes("application/json")
   public Response create(TodoDTO dto)
   {
      Todo entity = dto.fromDTO(null, em);
      em.persist(entity);
      TodoDTO dto2 = new TodoDTO(entity);
      return Response.ok(dto2).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      Todo entity = em.find(Todo.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      em.remove(entity);
      return Response.noContent().build();
   }

   @GET
   @Path("/{id:[0-9][0-9]*}")
   @Produces("application/json")
   public Response findById(@PathParam("id") Long id)
   {
      TypedQuery<Todo> findByIdQuery = em.createQuery("SELECT DISTINCT t FROM Todo t WHERE t.id = :entityId ORDER BY t.id", Todo.class);
      findByIdQuery.setParameter("entityId", id);
      Todo entity;
      try
      {
         entity = findByIdQuery.getSingleResult();
      }
      catch (NoResultException nre)
      {
         entity = null;
      }
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      TodoDTO dto = new TodoDTO(entity);
      return Response.ok(dto).build();
   }

   @GET
   @Produces("application/json")
   public List<TodoDTO> listAll()
   {
      final List<Todo> searchResults = em.createQuery("SELECT DISTINCT t FROM Todo t ORDER BY t.id", Todo.class).getResultList();
      final List<TodoDTO> results = new ArrayList<TodoDTO>();
      for (Todo searchResult : searchResults)
      {
         TodoDTO dto = new TodoDTO(searchResult);
         results.add(dto);
      }
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes("application/json")
   public Response update(@PathParam("id") Long id, TodoDTO dto)
   {
      TypedQuery<Todo> findByIdQuery = em.createQuery("SELECT DISTINCT t FROM Todo t WHERE t.id = :entityId ORDER BY t.id", Todo.class);
      findByIdQuery.setParameter("entityId", id);
      Todo entity;
      try
      {
         entity = findByIdQuery.getSingleResult();
      }
      catch (NoResultException nre)
      {
         entity = null;
      }
      entity = dto.fromDTO(entity, em);
      entity = em.merge(entity);
      return Response.noContent().build();
   }
}