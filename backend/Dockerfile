FROM node:23-alpine3.21

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY .package*.json ./
COPY prisma ./prisma
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["sh", "-e", "npx prisma generate && npm run dev"]