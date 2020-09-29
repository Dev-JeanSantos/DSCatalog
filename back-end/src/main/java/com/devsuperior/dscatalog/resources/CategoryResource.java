package com.devsuperior.dscatalog.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.entities.Category;

//Annotation definindo essa classe é um recurso Rest
@RestController 
//Annotation definindo a rota de api (rest)
@RequestMapping(value = "/categories")
public class CategoryResource {
	
	//Criação de END POINTS
	
	
	//Encapsular uma resposta http e é do tipo geneeric
	@GetMapping
	public ResponseEntity<List<Category>> findAll(){
		
		List<Category> list = new ArrayList<>();
		list.add(new Category(1L, "Eletronicos"));
		list.add(new Category(2L, "Jogos"));
		list.add(new Category(3L, "Livros"));
		
		return ResponseEntity.ok().body(list);
		
		

	}

}
