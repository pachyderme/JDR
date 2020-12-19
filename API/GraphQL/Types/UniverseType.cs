using API.Entities;
using GraphQL.Types;

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
