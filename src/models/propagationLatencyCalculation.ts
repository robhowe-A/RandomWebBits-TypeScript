//--Copyright (c) 2023-2026 Robert A. Howell

export class PropagationLatencyCalculation {
  private distance: number;
  private speed: number;
  private packetSize: number;
  private transmissionRate: number;
  private propagationDelay: number;
  private serializationDelay: number;
  private networkLatency: number;

  constructor(distance: number, speed: number, packetSize: number, transmissionRate: number) {
    this.distance = distance;
    this.speed = speed;
    this.packetSize = packetSize;
    this.transmissionRate = transmissionRate;
    this.propagationDelay = this.calculatePropagationDelay();
    this.serializationDelay = this.calculateSerializationDelay();
    this.networkLatency = this.calculateNetworkLatency();
  };

  public static numberValidation(intxt: string) {
    let trimmed = intxt.trim();
    let numbersRE = new RegExp("^[0-9]{1,30}$");
    if (numbersRE.test(trimmed)) {
      return true;
    } else {
      //input is not an acceptable number string.`);
      return false;
    }
  };

  public getDistance() {
    return this.distance;
  };

  public getSpeed() {
    return this.speed;
  };

  public getPropagationDelay() {
    return this.propagationDelay;
  };

  public getPacketSize() {
    return this.packetSize;
  };

  public getTransmissionRate() {
    return this.transmissionRate;
  };

  public getSerializationDelay() {
    return this.serializationDelay;
  };

  public getNetworkLatency() {
    return this.networkLatency;
  };

  private calculatePropagationDelay() {
    let propdelay = this.distance / this.speed;
    return propdelay;
  };

  private calculateSerializationDelay() {
    let serialdelay = this.packetSize / this.transmissionRate;
    return serialdelay;
  };

  private calculateNetworkLatency() {
    return this.propagationDelay + this.serializationDelay;
  };
};
