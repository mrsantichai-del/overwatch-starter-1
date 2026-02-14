import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    emitNewIncident(data: any) {
        this.server.emit('new_incident', data);
    }

    @SubscribeMessage('ping')
    handlePing(@MessageBody() data: string): string {
        return 'pong';
    }
}
