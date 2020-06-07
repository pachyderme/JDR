using API.Entities;
using GraphQL.Types;

namespace API.GraphQL.Types
{
    public class CharacterType : ObjectGraphType<Character>
    {
        public CharacterType()
        {
            Field(x => x.Id);
            Field(x => x.Initials).Description("Initials of the element (ex : 'DD')");
            Field(x => x.Name).Description("Template Name (ex: 'Luke')");
        }
    }
}
