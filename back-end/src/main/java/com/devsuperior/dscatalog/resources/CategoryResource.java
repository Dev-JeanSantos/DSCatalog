package com.devsuperior.dscatalog.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.services.CategoryService;

//Annotation definindo essa classe é um recurso Rest
@RestController 
//Annotation definindo a rota de api (rest)
@RequestMapping(value = "/categories")
public class CategoryResource {
	
	//Aqui é reaizazada a Criação de END POINTS
	
	//Chamada do serviço
	@Autowired
	private CategoryService service;
	
	//Encapsular uma resposta http e é do tipo geneeric
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll(){
		
		//Lista de categorias que através do recurso service busca todos os dados do bd
		List<CategoryDTO> list = service.findAll();
		
		return ResponseEntity.ok().body(list);
		
		

	}

}
