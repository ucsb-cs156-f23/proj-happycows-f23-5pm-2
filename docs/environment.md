# Environment Variables

- HAPPYCOWS_STARTING_BALANCE: used to change default starting balance
- HAPPYCOWS_COW_PRICE: used to change default starting cow price
- HAPPYCOWS_MILK_PRICE: used to change default milk price
- HAPPYCOWS_DEGRADATION_RATE: used to change default degradation rate
- HAPPYCOWS_CARRYING_CAPACITY: used to change default carrying capacity
- HAPPYCOWS_CAPACITY_PER_USER: used to change default capacity per user
- HAPPYCOWS_ABOVE_CAPACITY_HEALTH_UPDATE_STRATEGY: used to change default above capacity strategy
- HAPPYCOWS_BELOW_CAPACITY_HEALTH_UPDATE_STRATEGY: used to change default below capacity strategy

To change these values in the .env file, simply add the variable name={new value you want to use} on a new line
Ex. HAPPYCOWS_STARTING_BALANCE=50

To change these values from the application.properties file, just change the value on the line for the desired variable