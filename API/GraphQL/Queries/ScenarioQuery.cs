using API.GraphQL.Types;
using API.Repositories;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace API.GraphQL.Queries
{
    public class ScenarioQuery: ObjectGraphType
    {
        public ScenarioQuery(ScenarioRepository scenarioRepository)
        {
            Field<ListGraphType<ScenarioType>>("scenarios",
                arguments: new QueryArguments(new List<QueryArgument>
                {
                    new QueryArgument<IdGraphType>
                    {
                        Name = "id"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "name"
                    },
                    new QueryArgument<IntGraphType>
                    {
                        Name = "universeId"
                    },
                    new QueryArgument<IntGraphType>
                    {
                        Name = "templateId"
                    },
                    new QueryArgument<DateGraphType>
                    {
                        Name = "creationDate"
                    },
                    new QueryArgument<DateGraphType>
                    {
                        Name = "lastUpdateDate"
                    },
                    new QueryArgument<IntGraphType>
                    {
                        Name = "charactersCount"
                    }
                }),
                resolve: context =>
                {
                    //// pour récupérer l'utilisateur (sécurité)
                    //var user = (ClaimsPrincipal)context.UserContext;
                    //var isUserAuthenticated = ((ClaimsIdentity)user.Identity).IsAuthenticated;

                    var query = scenarioRepository.GetQuery();

                    var scenarioId = context.GetArgument<int?>("id");
                    if (scenarioId.HasValue)
                    {
                        return scenarioRepository.GetQuery().Where(s => s.Id == scenarioId.Value);
                    }

                    var creationDate = context.GetArgument<DateTime?>("creationDate");
                    if (creationDate.HasValue)
                    {
                        return scenarioRepository.GetQuery()
                            .Where(s => s.CreationDate.Date == creationDate.Value.Date);
                    }

                    var checkoutDate = context.GetArgument<DateTime?>("lastUpdateDate");
                    if (checkoutDate.HasValue)
                    {
                        return scenarioRepository.GetQuery()
                            .Where(s => s.UpdateDate.Date >= checkoutDate.Value.Date);
                    }

                    var universeId = context.GetArgument<int?>("universeId");
                    if (universeId.HasValue)
                    {
                        return scenarioRepository.GetQuery()
                            .Where(s => s.UniverseId == universeId.Value);
                    }

                    var templateId = context.GetArgument<int?>("templateId");
                    if (templateId.HasValue)
                    {
                        return scenarioRepository.GetQuery()
                            .Where(s => s.TemplateId == templateId.Value);
                    }

                    var charactersCount = context.GetArgument<int?>("charactersCount");
                    if (charactersCount.HasValue)
                    {
                        return scenarioRepository.GetQuery()
                        .Where(s => s.ScenarioCharacters.Count == charactersCount);
                    }

                    return query.ToList();
                }
            );

        }
    }
}
