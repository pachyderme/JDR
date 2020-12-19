using API.Entities;
using GraphQL.Types;

namespace API.GraphQL.Types
{
    public class ScenarioType : ObjectGraphType<Scenario>
    {
        public ScenarioType()
        {
            Field(x => x.Id);
            Field(x => x.Name).Description("Template Name (ex: 'Star wars')");
            Field(x => x.Summary).Description("Once upon a time...");
            Field(x => x.Goal).Description("Kill the big bad guy");
            Field(x => x.CreationDate).Description("Initial creation date");
            Field(x => x.UpdateDate).Description("Date of the last update");
            Field<TemplateType>(nameof(Scenario.Template));
            Field<UniverseType>(nameof(Scenario.Universe));
            Field<ListGraphType<CharacterType>>(nameof(Scenario.ScenarioCharacters));
        }
    }
}
