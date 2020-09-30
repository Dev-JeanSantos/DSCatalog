package com.devsuperior.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourcesNotFoundException;

//Service => registra a classe como componente de injeção de dependencias no springboot
@Service
public class CategoryService {
	
	@Autowired //injeção de dependencias
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(PageRequest pageRequest){
		
		Page<Category> list = repository.findAll(pageRequest);
		
		//Modelo de Conversão I
		//Atraves de um for convertemos a entidade category p/ categoryDAO
		/*
		List<CategoryDTO> listDTO = new ArrayList<>();
		for (Category cat : list) {
			listDTO.add(new CategoryDTO(cat));
		}
		*/
		
		//Modelo Conversão II
		//Atraves de expressão Lambda (alta ordem)		
		//return  list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
		return  list.map(x -> new CategoryDTO(x));
		

		
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new ResourcesNotFoundException("Categoria não Encontrada"));
		
		return new CategoryDTO(entity);
		
	
	}
	
	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		
		Category entity = new Category();
		entity.setName(dto.getName());		
		
		entity = repository.save(entity);
		
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		
		try {
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			
			return new CategoryDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourcesNotFoundException("Id Não encontrado" + id);
		}
		
	}

	public void delete(Long id) {
		
		try {
		repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourcesNotFoundException("ID not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");  
			
			
			// TODO: handle exception
		}
	}

}
