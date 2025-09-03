# AWS Bedrock Agent Chat Application - Angular

A beautiful Angular chat application for interacting with AWS Bedrock agents, featuring a modern blue and white UI with TypeScript support.

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (version 16 or higher)
- **Angular CLI**: `npm install -g @angular/cli`

## Setup Instructions

### 1. Create Project Directory
```bash
mkdir bedrock-chat-angular
cd bedrock-chat-angular
```

### 2. Copy Files
Create the following directory structure and copy the corresponding files:

```
bedrock-chat-angular/
├── package.json
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── tailwind.config.js
├── README.md
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   └── app/
│       ├── app.component.html
│       ├── app.component.scss
│       ├── app.component.ts
│       ├── app.module.ts
│       └── bedrock-chat/
│           ├── bedrock-chat.component.html
│           ├── bedrock-chat.component.scss
│           └── bedrock-chat.component.ts
```

### 3. Install Dependencies

#### For Corporate Networks:
```bash
# Set npm to use HTTP registry (if needed)
npm config set strict-ssl false
npm config set registry http://registry.npmjs.org/

# Install dependencies
npm install

# Re-enable SSL after installation
npm config set strict-ssl true
```

#### For Regular Networks:
```bash
npm install
```

### 4. Configure AWS Bedrock
Update the `config` object in `src/app/bedrock-chat/bedrock-chat.component.ts`:

```typescript
config: BedrockConfig = {
  region: 'your-aws-region',
  agentId: 'your-agent-id',
  agentAliasId: 'your-agent-alias-id',
  sessionId: `session-${Date.now()}`,
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key',
  sessionToken: 'your-session-token' // optional
};
```

### 5. Implement AWS Integration
Replace the mock `callBedrockAgent` method with actual AWS SDK calls:

```typescript
import { BedrockAgentRuntimeClient, InvokeAgentCommand } from "@aws-sdk/client-bedrock-agent-runtime";

async callBedrockAgent(message: string): Promise<string> {
  const client = new BedrockAgentRuntimeClient({
    region: this.config.region,
    credentials: {
      accessKeyId: this.config.accessKeyId,
      secretAccessKey: this.config.secretAccessKey,
      sessionToken: this.config.sessionToken
    }
  });

  const command = new InvokeAgentCommand({
    agentId: this.config.agentId,
    agentAliasId: this.config.agentAliasId,
    sessionId: this.config.sessionId,
    inputText: message
  });

  const response = await client.send(command);
  return response.completion;
}
```

### 6. Run the Application
```bash
ng serve
```

The application will be available at `http://localhost:4200`.

## Features

- 🎨 **Beautiful Design**: Modern blue and white theme with gradient backgrounds
- 💬 **Chat Interface**: Real-time message bubbles with user/bot distinction
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Updates**: Instant message rendering with smooth animations
- 🔄 **Loading States**: Visual feedback while waiting for responses
- 🗑️ **Clear Chat**: Start fresh conversations anytime
- ⌨️ **Keyboard Support**: Enter to send, Shift+Enter for new lines
- 📜 **Auto-scroll**: Always shows the latest messages
- 🛡️ **TypeScript**: Full type safety and IntelliSense support
- 🎯 **Error Handling**: Graceful error states with retry options

## Angular-Specific Features

- **Component Architecture**: Modular, reusable components
- **Two-way Data Binding**: Reactive form inputs with ngModel
- **Lifecycle Hooks**: Proper component initialization and cleanup
- **Type Safety**: Full TypeScript integration with interfaces
- **Template Syntax**: Angular's powerful template features
- **Dependency Injection**: Easy to test and extend

## Project Structure

```
src/app/
├── app.component.*          # Root application component
├── app.module.ts           # Main application module
└── bedrock-chat/
    ├── bedrock-chat.component.html    # Chat UI template
    ├── bedrock-chat.component.ts      # Chat logic & AWS integration
    └── bedrock-chat.component.scss    # Component-specific styles
```

## Development Commands

```bash
# Start development server
ng serve

# Build for production
ng build

# Run unit tests
ng test

# Generate new component
ng generate component component-name

# Build and serve production build
ng build --prod
ng serve --prod
```

## AWS Bedrock Requirements

1. **AWS Account** with Bedrock access enabled
2. **Bedrock Agent** created and deployed in your region
3. **AWS Credentials** with appropriate IAM permissions:
   - `bedrock:InvokeAgent`
   - `bedrock:GetAgent`
   - `bedrock:GetAgentAlias`
4. **Agent Configuration**: Agent ID and Alias ID from AWS Console

## Security Considerations

For production deployment:

- **Environment Variables**: Store credentials in environment files
- **AWS Cognito**: Implement proper authentication
- **HTTPS**: Always use secure connections
- **Rate Limiting**: Implement request throttling
- **Input Validation**: Sanitize user inputs
- **Error Boundaries**: Handle AWS service errors gracefully

## Troubleshooting

### Common Issues:

1. **npm install fails**: Use corporate network commands above
2. **Compilation errors**: Ensure TypeScript version compatibility
3. **AWS connection fails**: Check credentials and region settings
4. **Styles not loading**: Verify Tailwind CSS configuration

### Debug Mode:
```bash
ng serve --source-map
```

## Contributing

This is a template project. To extend functionality:

1. Add message persistence service
2. Implement user authentication
3. Add file upload capabilities
4. Create message export features
5. Add conversation history

## License

This project is provided as-is for demonstration and development purposes.