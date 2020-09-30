package com.devsuperior.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Product;

//Interface Responsavel ao acesso aos dados que extends ao JPARepository que recebe o tipo do objeto e tipo de seu ID
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	
	
	
}
