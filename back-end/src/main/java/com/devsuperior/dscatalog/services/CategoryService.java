package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.EntityNotFoundException;

//Service => registra a classe como componente de injeção de dependencias no springboot
@Service
public class CategoryService {
	
	@Autowired //injeção de dependencias
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		
		List<Category> list = repository.findAll();
		
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
		
		return  list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
		

		
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new EntityNotFoundException("Categoria não Encontrada"));
		
		return new CategoryDTO(entity);
		
	
	}
	
	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		
		Category entity = new Category();
		entity.setName(dto.getName());		
		
		entity = repository.save(entity);
		
		return new CategoryDTO(entity);
	}

}
