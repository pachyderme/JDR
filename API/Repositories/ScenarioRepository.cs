using API.Context;
using API.Entities;
using API.Entities.Scenario;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class ScenarioRepository
    {
        private readonly JDRDbContext jdrDbContext;

        public ScenarioRepository(JDRDbContext jdrDbContext)
        {
            this.jdrDbContext = jdrDbContext;
        }

        public async Task<IEnumerable<Scenario>> GetAll()
        {
            return await GetQuery().ToListAsync();
        }

        public Scenario Get(int id)
        {
            return GetQuery().Single(x => x.Id == id);
        }

        public IIncludableQueryable<Scenario, List<Character>> GetQuery()
        {
            return jdrDbContext
                 .Scenarios
                 .Include(x => x.Universe)
                 .Include(x => x.Template)
                 .Include(x => x.Characters);
        }
    }
}
