namespace API.Entities
{
    public class ScenarioLocation
    {
        public int ScenarioId { get; set; }
        public Scenario Scenario { get; set; }

        public int LocationId { get; set; }
        public Location Location { get; set; }
    }
}
