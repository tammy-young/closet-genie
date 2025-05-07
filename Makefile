.PHONY: backend frontend local

backend:
	cd backend && npm run start

frontend:
	cd frontend && npm run dev

local:
	cd backend && npm run start & cd frontend && npm run dev
