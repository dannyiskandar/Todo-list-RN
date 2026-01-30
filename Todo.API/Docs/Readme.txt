Things to discuss
1. Project Architecture
	 - Todo.Domain            entities, enums
     - Todo.Application       DTOs, interfaces for services, services implementations
     - Todo.Infrastructure    Database, repositories, external APIs
2. Database 
   - memory database 
   - set up IEntityTypeConfiguration - define how your classes map to the database in a centralized way. 
   - future works : enable auto migrations (first code approach)
3. AutoMapper - mapping between entities and DTOs
4. Dtos Validation - FluentValidation
5. Global Error Handling - Middleware for handling exceptions and returning standardized error responses
6. JsonStringEnumMemberConverter - serialize enums as strings in JSON responses

NOTE: we can use MediatR for CQRS pattern structure if we think the code base will grow significantly in the future. 
for now, keeping it simple with services is fine.
