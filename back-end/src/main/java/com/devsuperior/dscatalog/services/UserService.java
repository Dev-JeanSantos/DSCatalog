package com.devsuperior.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.RoleDTO;
import com.devsuperior.dscatalog.dto.UserDTO;
import com.devsuperior.dscatalog.dto.UserInsertDTO;
import com.devsuperior.dscatalog.entities.Role;
import com.devsuperior.dscatalog.entities.User;
import com.devsuperior.dscatalog.repositories.RoleRepository;
import com.devsuperior.dscatalog.repositories.UserRepository;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourcesNotFoundException;

//Service => registra a classe como componente de injeção de dependencias no springboot
@Service
public class UserService {
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired //injeção de dependencias
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(PageRequest pageRequest){
		
		Page<User> list = repository.findAll(pageRequest);
		
		//Modelo de Conversão I
		//Atraves de um for convertemos a entidade category p/ categoryDAO
		/*
		List<UserDTO> listDTO = new ArrayList<>();
		for (User cat : list) {
			listDTO.add(new UserDTO(cat));
		}
		*/
		
		//Modelo Conversão II
		//Atraves de expressão Lambda (alta ordem)		
		//return  list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
		
		return  list.map(x -> new UserDTO(x));	
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourcesNotFoundException("Categoria não Encontrada"));
		
		return new UserDTO(entity);
		
	
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		
		User entity = new User();
		copyDtoToEntity(dto, entity);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = repository.save(entity);		
		return new UserDTO(entity);
	}
	

	@Transactional
	public UserDTO update(Long id, UserDTO dto) {
		
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);			
			return new UserDTO(entity);
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
	

	private void copyDtoToEntity(UserDTO dto, User entity) {
		
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		
		
		entity.getRoles().clear();
		for (RoleDTO roleDTO : dto.getRoles()) {
			Role role = roleRepository.getOne(roleDTO.getId());
			entity.getRoles().add(role);
		}
		
	}
}
