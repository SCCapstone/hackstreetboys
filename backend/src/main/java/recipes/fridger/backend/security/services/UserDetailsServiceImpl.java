package recipes.fridger.backend.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    Users users;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        User user = users.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
		return UserDetailsImpl.build(user);
    }
}
