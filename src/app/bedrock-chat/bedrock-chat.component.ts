import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
}

interface BedrockConfig {
  region: string;
  agentId: string;
  agentAliasId: string;
  sessionId: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}

@Component({
  selector: 'app-bedrock-chat',
  templateUrl: './bedrock-chat.component.html',
  styleUrls: ['./bedrock-chat.component.scss']
})
export class BedrockChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  inputMessage = '';
  isLoading = false;

  config: BedrockConfig = {
    region: 'us-east-1',
    agentId: 'your-agent-id',
    agentAliasId: 'your-agent-alias-id',
    sessionId: `session-${Date.now()}`,
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: ''
  };

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  async callBedrockAgent(message: string): Promise<string> {
    try {
      // This is where you would implement the actual AWS Bedrock agent call
      // Example structure:
      /*
      import { BedrockAgentRuntimeClient, InvokeAgentCommand } from "@aws-sdk/client-bedrock-agent-runtime";
      
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
      */

      // Mock response for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `This is a mock response to: "${message}". Replace the callBedrockAgent function with your actual AWS Bedrock agent integration.`;
    } catch (error) {
      console.error('Error calling Bedrock agent:', error);
      throw new Error('Failed to get response from Bedrock agent');
    }
  }

  async sendMessage() {
    if (!this.inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: this.inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    const currentMessage = this.inputMessage;
    this.inputMessage = '';
    this.isLoading = true;

    try {
      const response = await this.callBedrockAgent(currentMessage);
      
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      this.messages.push(botMessage);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error while processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      this.messages.push(errorMessage);
    } finally {
      this.isLoading = false;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearMessages() {
    this.messages = [];
    this.config.sessionId = `session-${Date.now()}`;
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString();
  }
}