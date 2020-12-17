package com.devsuperior.dscatalog.tests.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.factory.ProductFactory;
import com.devsuperior.dscatalog.repositories.ProductRepository;

@DataJpaTest
public class ProductRepositoryTest {
	
	@Autowired
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPCGamerProducts;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setUp() throws Exception {

		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
		
	}
	
	
	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {
		
		String name = "";
		
		
		Page<Product> result = repository.search(name, null, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		
		String name = "pc gAMER";
		
		Page<Product> result = repository.search(name, null, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		
		String name = "PC Gamer";
	
		Page<Product> result = repository.search(name, null, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		
		repository.deleteById(existingId);
		
		Optional<Product> result = repository.findById(existingId);
		
		Assertions.assertFalse(result.isPresent());
		
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		
		});		
	}
	
	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
		
	}
}
