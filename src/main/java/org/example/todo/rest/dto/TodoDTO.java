package org.example.todo.rest.dto;

import java.io.Serializable;
import org.example.todo.model.Todo;
import javax.persistence.EntityManager;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TodoDTO implements Serializable
{

   private Long id;
   private String description;
   private boolean completed;
   private int version;

   public TodoDTO()
   {
   }

   public TodoDTO(final Todo entity)
   {
      if (entity != null)
      {
         this.id = entity.getId();
         this.description = entity.getDescription();
         this.completed = entity.getCompleted();
         this.version = entity.getVersion();
      }
   }

   public Todo fromDTO(Todo entity, EntityManager em)
   {
      if (entity == null)
      {
         entity = new Todo();
      }
      entity.setDescription(this.description);
      entity.setCompleted(this.completed);
      entity.setVersion(this.version);
      entity = em.merge(entity);
      return entity;
   }

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public String getDescription()
   {
      return this.description;
   }

   public void setDescription(final String description)
   {
      this.description = description;
   }

   public boolean getCompleted()
   {
      return this.completed;
   }

   public void setCompleted(final boolean completed)
   {
      this.completed = completed;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }
}