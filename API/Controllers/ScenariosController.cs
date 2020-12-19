using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Repositories;
using API.Entities;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScenariosController : ControllerBase
    {
        private readonly ScenarioRepository scenarioRepository;

        public ScenariosController(ScenarioRepository scenarioRepository)
        {
            this.scenarioRepository = scenarioRepository;
        }

        // GET: api/Scenarios
        [HttpGet("[action]")]
        public async Task<IEnumerable<Scenario>> List()
        {
            return await scenarioRepository.GetAll();
        }
    }
}
