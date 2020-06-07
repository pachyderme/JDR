using API.Entities.Scenario;
using GraphQL.Types;
using System.Collections.Generic;

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
            Field(x => x.LastUpdateDate).Description("Date of the last update");
            Field<TemplateType>(nameof(Scenario.Template));
            Field<UniverseType>(nameof(Scenario.Universe));
            Field<ListGraphType<CharacterType>>(nameof(Scenario.Characters));
        }
    }
}
