package com.devsuperior.dscatalog.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.UserDTO;
import com.devsuperior.dscatalog.dto.UserInsertDTO;
import com.devsuperior.dscatalog.services.UserService;

//Annotation definindo essa classe é um recurso Rest
@RestController
//Annotation definindo a rota de api (rest)
@RequestMapping(value = "/users")
public class UserResource {

	// Aqui é reaizazada a Criação de END POINTS

	// Chamada do serviço
	@Autowired
	private UserService service;

	// Encapsular uma resposta http e é do tipo geneeric
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAllPaged(
			
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "firstName") String orderBy			
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage,Direction.valueOf(direction), orderBy );
		
		//Lista de categorias que através do recurso service busca todos os dados do bd
		Page<UserDTO> list = service.findAllPaged(pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	//Novo EndPoint buscar por ID	
	@GetMapping(value = "/{id}")//recebe o id pesquisado
	public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
		
		UserDTO dto = service.findById(id);
		
		return ResponseEntity.ok().body(dto);

	}
	
	//Novo EndPoint Inserir Categoria
	@PostMapping
	public ResponseEntity<UserDTO> insert(@RequestBody UserInsertDTO dto){
		UserDTO userdto = service.insert(dto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(userdto.getId()).toUri();
		
		return ResponseEntity.created(uri).body(userdto);
		
		
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO dto){
		dto = service.update(id, dto);
		
		return ResponseEntity.ok().body(dto);			
		
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<UserDTO> delete(@PathVariable Long id){
		service.delete(id);
		
		return ResponseEntity.noContent().build();
		
	}
	
	
	
	
	

}
