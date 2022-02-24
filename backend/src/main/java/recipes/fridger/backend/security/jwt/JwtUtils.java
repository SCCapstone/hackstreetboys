package recipes.fridger.backend.security.jwt;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import recipes.fridger.backend.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;

@Component
@Slf4j
public class JwtUtils {
    @Value("${recipes.fridger.jwtSecret}")
    private String secret;

    @Value("${recipes.fridger.jwtExpirationMs}")
    private int expiration;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
            .setSubject((userPrincipal.getUsername()))
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + expiration))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }

    public String getUsernameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			log.error("Invalid signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			log.error("Invalid token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			log.error("Token expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			log.error("Token unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("Claims empty: {}", e.getMessage());
		}
		return false;
	}


}
