# Database Configuration

## Running Migrations

To run all migrations in order:

```bash
mysql -u root -p crm_system < migrations/001_create_users_table.sql
mysql -u root -p crm_system < migrations/002_create_leads_table.sql
mysql -u root -p crm_system < migrations/003_create_customers_table.sql
mysql -u root -p crm_system < migrations/004_create_deals_table.sql
mysql -u root -p crm_system < migrations/005_create_activities_table.sql
```

Or use the complete schema:

```bash
mysql -u root -p crm_system < schema.sql
```

## Running Seed Files

```bash
mysql -u root -p crm_system < seed/users.sql
mysql -u root -p crm_system < seed/leads.sql
mysql -u root -p crm_system < seed/customers.sql
mysql -u root -p crm_system < seed/deals.sql
```

## Using Prisma ORM

1. Install Prisma:

```bash
npm install @prisma/client prisma --save-dev
```

2. Configure DATABASE_URL in `.env`:

```
DATABASE_URL="mysql://user:password@localhost:3306/crm_system"
```

3. Push schema to database:

```bash
npx prisma migrate dev --name init
```

4. Generate Prisma Client:

```bash
npx prisma generate
```

## Database Structure

- **Users**: Authentication and team members
- **Leads**: Potential sales opportunities
- **Customers**: Established customer accounts
- **Deals**: Sales opportunities in the pipeline
- **Activities**: Interaction history with leads, customers, and deals
