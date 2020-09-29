package com.devsuperior.dscatalog.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.services.CategoryService;

//Annotation definindo essa classe é um recurso Rest
@RestController
//Annotation definindo a rota de api (rest)
@RequestMapping(value = "/categories")
public class CategoryResource {

	// Aqui é reaizazada a Criação de END POINTS

	// Chamada do serviço
	@Autowired
	private CategoryService service;

	// Encapsular uma resposta http e é do tipo geneeric
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll(){
		
		//Lista de categorias que através do recurso service busca todos os dados do bd
		List<CategoryDTO> list = service.findAll();
		
		return ResponseEntity.ok().body(list);
	}
	//Novo EndPoint buscar por ID	
	@GetMapping(value = "/{id}")//recebe o id pesquisado
	public ResponseEntity<CategoryDTO> findById(@PathVariable Long id) {
		
		CategoryDTO dto = service.findById(id);
		
		return ResponseEntity.ok().body(dto);

	}
	
	//Novo EndPoint Inserir Categoria
	@PostMapping
	public ResponseEntity<CategoryDTO> insert(@RequestBody CategoryDTO dto){
		dto = service.insert(dto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
		
		
	}
	
	
	
	
	
	
	

}
