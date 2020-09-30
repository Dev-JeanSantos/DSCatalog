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

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourcesNotFoundException;

//Service => registra a classe como componente de injeção de dependencias no springboot
@Service
public class ProductService {
	
	@Autowired //injeção de dependencias
	private ProductRepository repository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest){
		
		Page<Product> list = repository.findAll(pageRequest);
		
		//Modelo de Conversão I
		//Atraves de um for convertemos a entidade category p/ categoryDAO
		/*
		List<ProductDTO> listDTO = new ArrayList<>();
		for (Product cat : list) {
			listDTO.add(new ProductDTO(cat));
		}
		*/
		
		//Modelo Conversão II
		//Atraves de expressão Lambda (alta ordem)		
		//return  list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
		
		return  list.map(x -> new ProductDTO(x));
		

		
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourcesNotFoundException("Categoria não Encontrada"));
		
		return new ProductDTO(entity, entity.getCategories());
		
	
	}
	
	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		
		Product entity = new Product();
	//	entity.setName(dto.getName());		
		
		entity = repository.save(entity);
		
		return new ProductDTO(entity);
	}
	
	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		
		try {
			Product entity = repository.getOne(id);
	//		entity.setName(dto.getName());
			entity = repository.save(entity);
			
			return new ProductDTO(entity);
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
