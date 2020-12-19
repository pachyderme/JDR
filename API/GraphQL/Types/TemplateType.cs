using API.Entities;
using GraphQL.Types;

namespace API.GraphQL.Types
{
    public class TemplateType : ObjectGraphType<Template>
    {
        public TemplateType()
        {
            Field(x => x.Id);
            Field(x => x.Name).Description("Template Name (ex: 'Linear')");
        }
    }
}
