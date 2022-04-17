package recipes.fridger.backend.controllers;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.With;
import org.checkerframework.checker.units.qual.C;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.isNotNull;
import static org.mockito.Mockito.when;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.controller.UserController;
import recipes.fridger.backend.crud.Pantries;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;
import recipes.fridger.backend.service.UserServiceImpl;

import java.math.BigDecimal;
import java.util.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @InjectMocks
    UserController userController;

    @MockBean
    Pantries pantryRepo;

    @MockBean
    UserService userService;

    @MockBean
    PantryService pantryService;

    @Autowired
    ObjectMapper mapper;

//    @BeforeEach
//    void setUP() throws Exception {
//        MockitoAnnotations.initMocks(this);
//    }


    @Test
	public void contextLoads() throws Exception {
		assertThat(userService).isNotNull();
	}

    // Endpoint removed
    // @Test
    // public void createAndAuthUser() throws Exception {
    //     User user = new User();
    //     // Deprecated
    //     // user.setType("NORMAL");
    //     user.setEmail("seonghopark@gmail.com");
    //     user.setPassword("password");
    //     user.setName("Seongho Park");
    //     user.setBio("I am seongho park");

    //     Calendar dob = Calendar.getInstance();
    //     dob.set(Calendar.YEAR, 1990);
    //     dob.set(Calendar.MONTH, Calendar.JANUARY);
    //     dob.set(Calendar.DAY_OF_MONTH, 1);

    //     user.setDob(dob.getTime());
    //     user.setHeight_in(72);
    //     user.setWeight_lb(160.0);

    //     when(userService.authenticateUser("seonghopark@gmail.com", "password")).thenReturn(user);

    //     this.mockMvc.perform(
    //         post("http://localhost:8080" + "/v1/user/")
    //         .contentType(MediaType.APPLICATION_JSON)
    //         .content(mapper.writeValueAsString(user))
    //     ).andExpect(status().isOk());

    //     assertEquals(
    //         userService.authenticateUser(
    //             "seonghopark@gmail.com",
    //             "password"
    //         ),
    //         user
    //     );
    // }
    @Test
    @WithMockUser
    public void createPantryItemOldMethodAssertNull() throws Exception {
        //Create Pantry
        Pantry pantryTest1 = new Pantry(); //this will generate random id

        pantryTest1.setUserID(123L);
        pantryTest1.setIngredientName("banana");
        pantryTest1.setNumIngredient(3.0);
        pantryTest1.setDescription("this is a banana for monkeys");

        when(pantryService.getSinglePantryByUser(123L)).thenReturn(pantryTest1);

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/user/pantry")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(pantryTest1))
        ).andExpect(status().isOk());

        //TEST to see if data passed in correctly
        //banana=banana etc.

        //assertEquals(1234567890L,pantryTest1.getUserID());
        //this is an older method and should be null
        assertNotEquals(
                pantryService.getPantryByUserID(123L), null
        );
    }
    @Test
    @WithMockUser
    public void CreateTwoPantryItemsWithDifferentUsers() throws Exception {
        //Create Pantry Objects
        Pantry pantryTest1 = new Pantry(); //this will generate random id
        pantryTest1.setUserID(123L);
        pantryTest1.setIngredientName("banana");
        pantryTest1.setNumIngredient(3.0);
        pantryTest1.setDescription("this is a banana for monkeys");

        Pantry pantryTest2 = new Pantry(); //this will generate random id
        pantryTest2.setUserID(256L);
        pantryTest2.setIngredientName("apple");
        pantryTest2.setNumIngredient(1.0);
        pantryTest2.setDescription("this is an apple for test");

        List<Pantry> pantries = new ArrayList<Pantry>();
        pantries.add(pantryTest1);
        pantries.add(pantryTest2);

        when(pantryService.getSinglePantryByUser(123L)).thenReturn(pantryTest1);
        when(pantryService.getSinglePantryByUser(256L)).thenReturn(pantryTest2);
//        doReturn(pantries).when(pantryService).getAllPantrys();
//        when(pantryService.getAllPantrys()).thenReturn(pantries);

        this.mockMvc.perform(
                get("http://localhost:8080" + "/v1/user/pantry/"+(pantryTest1.getUserID()).toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(pantryTest1))
        ).andExpect(status().isOk());

        this.mockMvc.perform(
                get("http://localhost:8080" + "/v1/user/pantry/"+(pantryTest2.getUserID()).toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(pantryTest2))
        ).andExpect(status().isOk());


        assertAll("Each pantry should have been added and returned",
            () -> assertEquals(pantryService.getPantryByUserID(123L), pantryTest1)
            ,() -> assertEquals(pantryService.getPantryByUserID(256L), pantryTest2)
            //,() -> assertEquals(pantryService.getAllPantrys(), pantries)
        );

    }
    @Test
    @WithMockUser
    public void CreateNewPantryItem() {
//        Pantry pantryTest1 = new Pantry(); //this will generate random id
//
//        pantryTest1.setUserID(123L);
//        pantryTest1.setIngredientName("banana");
//        pantryTest1.setNumIngredient(3.0);
//        pantryTest1.setDescription("this is a banana for monkeys");
//
//
//        CreatePantryDTO p = new CreatePantryDTO();
//        p.setUserID(123L);
//        p.setIngredientName("banana");
//        p.setNumIngredient(3.0);
//        p.setDescription("this is a banana for monkeys");
//
//        when(pantryService.createPantry(p)).thenReturn(pantryTest1);
//
//        this.mockMvc.perform(
//                post("http://localhost:8080" + "/v1/user/pantry")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(mapper.writeValueAsString(pantryTest1))
//        ).andExpect(status().isOk());
//
//        //TEST to see if data passed in correctly
//        //banana=banana etc.
//
//        //assertEquals(1234567890L,pantryTest1.getUserID());
//        //this is an older method and should be null
//        assertNotEquals(
//                pantryService.getPantryByUserID(123L), null
//        );
    }
    @Test
    @WithMockUser
    public void CreateNewPantryItemTest() throws Exception {

        Pantry pan = new Pantry();
        pan.setUserID(123L);
        pan.setIngredientName("banana");
        pan.setNumIngredient(3.0);
        pan.setDescription("banana for your banana bread");

        //whenever this method is hit the then return will return pan, instead of actually calling the method
        when(pantryRepo.save(pan)).thenReturn(pan);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("http://localhost:8080/v1/user/pantry")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(pan));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",is("Created pantry")));

    }
    @Test
    @WithMockUser
    public void GetPantryByUserIDTest() throws Exception {
        List<Pantry> pantries = new ArrayList<>();

        Pantry pan = new Pantry();
        pan.setUserID(123L);
        pan.setIngredientName("banana");
        pan.setNumIngredient(3.0);
        pan.setDescription("banana for your banana bread");

        pantries.add(pan);

        when(pantryService.getPantryByUserID(123L)).thenReturn(pantries);

        mockMvc.perform(get("http://localhost:8080/v1/user/pantry/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",hasSize(1)))
                .andExpect(jsonPath("$[0].ingredientName",is("banana")));
    }
    @Test
    @WithMockUser
    public void GetAllPantriesTest() throws Exception {
        List<Pantry> pantries = new ArrayList<>();

        Pantry pan = new Pantry();
        pan.setUserID(123L);
        pan.setIngredientName("banana");
        pan.setNumIngredient(3.0);
        pan.setDescription("banana for your banana bread");

        pantries.add(pan);

        Pantry pan1 = new Pantry();
        pan1.setUserID(256L);
        pan1.setIngredientName("apple");
        pan1.setNumIngredient(2.0);
        pan1.setDescription("apple for your apple bread");

        pantries.add(pan1);

        when(pantryService.getAllPantrys()).thenReturn(pantries);

        mockMvc.perform(get("http://localhost:8080/v1/user/pantry")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",hasSize(2)))
                .andExpect(jsonPath("$[0].ingredientName",is("banana")))
                .andExpect(jsonPath("$[0].userID",is(123)))
                .andExpect(jsonPath("$[1].ingredientName",is("apple")))
                .andExpect(jsonPath("$[1].userID",is(256)));
    }
    @Test
    @WithMockUser
    public void IncrementPantryItem_Success() throws Exception {

        Pantry pan1 = new Pantry();
        pan1.setId(12312310L);
        pan1.setUserID(123L);
        pan1.setIngredientName("banana");
        pan1.setNumIngredient(3.0);
        pan1.setDescription("banana for your banana bread");

        Optional<Pantry> pan = Optional.ofNullable(pan1);

        Mockito.when(pantryRepo.findByPantryID(pan1.getId())).thenReturn(Optional.of(pan1));
        Mockito.when(pantryRepo.save(pan1)).thenReturn(pan1);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("http://localhost:8080/v1/user/pantry/increase/"+pan1.getId().toString())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(pan));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$", is("Successfully Incremented pantry item by 1")));

    }
}






























