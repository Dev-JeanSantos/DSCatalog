package com.devsuperior.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;

//Service => registra a classe como componente de injeção de dependencias no springboot
@Service
public class CategoryService {
	
	@Autowired //injeção de dependencias
	private CategoryRepository repository;
	
	public List<Category> findAll(){
		
		return repository.findAll();
		
	}

}
