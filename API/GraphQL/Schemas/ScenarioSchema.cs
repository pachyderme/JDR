using API.GraphQL.Queries;
using GraphQL;
using GraphQL.Types;

namespace API.GraphQL.Schemas
{
    public class ScenarioSchema: Schema
    {
        public ScenarioSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<ScenarioQuery>();
        }
    }
}
