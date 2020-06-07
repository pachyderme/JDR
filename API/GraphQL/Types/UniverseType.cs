using API.Entities.Scenario;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.GraphQL.Types
{
    public class UniverseType: ObjectGraphType<Universe>
    {
        public UniverseType()
        {
            Field(x => x.Id);
            Field(x => x.Initials).Description("Initials of the element (ex : 'DD')");
            Field(x => x.Name).Description("Universe Name (ex: 'Dungeons and Dragons')");
        }
    }
}
