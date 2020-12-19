namespace API.Entities
{
    public class ScenarioRessource
    {
        public int ScenarioId { get; set; }
        public Scenario Scenario { get; set; }

        public int RessourceId { get; set; }
        public Ressource Ressource { get; set; }
    }
}
