/*

import { Channel, Server } from "easygfx";

const server = new Server();

server.onMessage = (data) => {
3
}

*/

// See: https://github.com/Compro72/Card-Game/blob/main/network/p2p.js
// For reference of implementation.

class P2PDataChannel {
  private device: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private iceList: RTCIceCandidate[] = [];
  private isInitiator = false;

  public onSignalGenerated: (signal: string) => void = () => {};
  public onDataReceived: (data: string) => void = () => {};

  private initialize(): void {
    this.device = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    this.iceList = [];

    this.device.onicecandidate = this.onIceCandidate.bind(this);
    this.device.ondatachannel = this.onDataChannel.bind(this);
  }

  private onIceCandidate(event: RTCPeerConnectionIceEvent): void {
    const { candidate } = event;

    if (candidate !== null) {
      this.iceList.push(candidate);
      return;
    }

    if (!this.device) {
      return;
    }

    let input = JSON.stringify(
      {
        sdp: this.device.localDescription,
        iceList: this.iceList,
      },
      null,
      2,
    );

    if (this.isInitiator) {
      input = `${document.URL}#offer=${encodeURIComponent(input)}`;
    }

    this.onSignalGenerated(input);
  }

  private onDataChannel(event: RTCDataChannelEvent): void {
    this.dataChannel = event.channel;

    this.dataChannel.onmessage = (event: MessageEvent) => {
      this.onDataReceived(event.data);
    };
  }

  public async createOffer(): Promise<void> {
    this.isInitiator = true;
    this.initialize();

    if (!this.device) {
      throw new Error("Failed to initialize RTCPeerConnection");
    }

    this.dataChannel = this.device.createDataChannel("dataChannel");

    this.dataChannel.onmessage = (event: MessageEvent) => {
      this.onDataReceived(event.data);
    };

    const offer = await this.device.createOffer();
    await this.device.setLocalDescription(offer);
  }

  public async process(text: string): Promise<void> {
    const input = JSON.parse(text) as {
      sdp: RTCSessionDescriptionInit;
      iceList?: RTCIceCandidateInit[];
    };

    const otherSDP = input.sdp;
    const otherIceList = input.iceList ?? [];

    if (!this.device) {
      this.isInitiator = false;
      this.initialize();
    }

    if (!this.device) {
      throw new Error("Failed to initialize RTCPeerConnection");
    }

    await this.device.setRemoteDescription(otherSDP);

    for (const candidate of otherIceList) {
      await this.device.addIceCandidate(candidate);
    }

    if (otherSDP.type === "offer") {
      const answer = await this.device.createAnswer();
      await this.device.setLocalDescription(answer);
    }
  }

  public sendData(data: unknown): void {
    if (!this.dataChannel) {
      throw new Error("Data channel has not been created");
    }

    if (this.dataChannel.readyState !== "open") {
      throw new Error(
        `Data channel is not open (state: ${this.dataChannel.readyState})`,
      );
    }

    this.dataChannel.send(JSON.stringify(data));
  }

  public close(): void {
    this.dataChannel?.close();
    this.device?.close();

    this.dataChannel = null;
    this.device = null;
    this.iceList = [];
    this.isInitiator = false;
  }
}
