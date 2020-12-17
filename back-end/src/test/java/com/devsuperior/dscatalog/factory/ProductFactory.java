package com.devsuperior.dscatalog.factory;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;

public class ProductFactory {
	
	public static Product createProduct() {
		
		return new Product(1L, "TV", "OLED", 500.00, "https://img.tv.png", Instant.parse("2021-10-20T01:00:00Z"));
	
	}
	
	public static ProductDTO createProductDTO() {
		
		return new ProductDTO(createProduct());
 	
	}
}
