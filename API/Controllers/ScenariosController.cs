using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Context;
using API.Entities.Scenario;
using API.Repositories;

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
