namespace API.Entities
{
    public class ScenarioCharacter
    {
        public int ScenarioId { get; set; }
        public Scenario Scenario { get; set; }

        public int CharacterId { get; set; }
        public Character Character { get; set; }
    }
}
