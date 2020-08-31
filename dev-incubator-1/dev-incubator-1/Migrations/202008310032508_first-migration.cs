namespace dev_incubator_1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class firstmigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Points",
                c => new
                    {
                        PointId = c.Int(nullable: false, identity: true),
                        PointX = c.Double(nullable: false),
                        PointY = c.Double(nullable: false),
                        ChartId_UserDataId = c.Int(),
                    })
                .PrimaryKey(t => t.PointId)
                .ForeignKey("dbo.UserDatas", t => t.ChartId_UserDataId)
                .Index(t => t.ChartId_UserDataId);
            
            CreateTable(
                "dbo.UserDatas",
                c => new
                    {
                        UserDataId = c.Int(nullable: false, identity: true),
                        RangeFrom = c.Int(),
                        RangeTo = c.Int(),
                        Step = c.Single(),
                        A = c.Int(),
                        B = c.Int(),
                        C = c.Int(),
                    })
                .PrimaryKey(t => t.UserDataId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Points", "ChartId_UserDataId", "dbo.UserDatas");
            DropIndex("dbo.Points", new[] { "ChartId_UserDataId" });
            DropTable("dbo.UserDatas");
            DropTable("dbo.Points");
        }
    }
}
