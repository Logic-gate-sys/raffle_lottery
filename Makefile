# --- Load environment variables ---
ifneq (,$(wildcard .env))
	include .env
	export $(shell sed 's/=.*//' .env)
endif

# --- Configuration ---
ETHERSCAN_API_KEY := ${ETHERSCAN_KEY_API}
DEPLOYER_KEY_SEPOLIA := ${SEPOLIA_PRIVATE_KEY}
INFURA_SEPOLIA_RPC := ${SEPOLIA_ENDPOINT}
ANVIL_PRIVATE_KEY:=${ANVIL_PRIVATE_KEY}

# --- Compile contracts ---
build:
	forge build

# --- Run tests with gas report ---
test_raffle:
	forge test -vvv --gas-report

# --- Deploy raffle to Sepolia ---
deploy_raffle_sepolia:
	forge script script/DeployRaffle.s.sol:DeployRaffle \
		--rpc-url ${INFURA_SEPOLIA_RPC} \
		--private-key ${DEPLOYER_KEY_SEPOLIA} \
		--broadcast \
		--verify \
		--etherscan-api-key ${ETHERSCAN_API_KEY} \
		--slow
	@echo "Raffle deployed to Sepolia and verified on Etherscan."

# --- Deploy raffle to Anvil (local chain) ---
deploy_raffle_anvil: 
	forge script script/DeployRaffle.s.sol:DeployRaffle \
		--rpc-url  http://127.0.0.1:8545 \
		--private-key ${ANVIL_PRIVATE_KEY}\
		--broadcast\
		--slow\
		-vvvv
	


clean:
	rm -rf buil/

.PHONY: build test_raffle deploy_raffle_sepolia deploy_raffle_anvil