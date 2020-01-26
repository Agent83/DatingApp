using System.Threading.Task;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public await Task<User> Register(User user, string password)
        {
              byte[] passwordHash, passwordSalt;
              CreatePasswordHash(password, out passwordHash, out passwordSalt);

              user.PasswordHash = passwordHash;
              user.PasswordSalt = passwordSalt;

              await _context.Users.AddSync(user);
              await _context.SaveChangesAsynce();

              return user;
        }

        CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {      
            using ( var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding,UTF8.GetBytes(password));
            }
        }

        public async Task<User> Login(string username, string password)
        {
           var user = await _context.Users.FirstOrDefaultAsync(x =>x.Username == username);

           if(user == null)
           return null;

           if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
           return null;

           return user;
        }  

        private bool VerifyPasswordHash(password, byte[] passwordHash,byte[] passwordSalt)
        {
          using ( var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash.(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i = 0; i< computeHash.Length; i++)
                {
                    if(computeHash[i] != passwordHash[i]) return false
                }
            }
            return true;
        }
        public Task<bool> UserExists(string username)
        {
           if(await _context.Users.AnyAsync(x => x.Username == username))
           return true;

           return false;
        }
    }
}