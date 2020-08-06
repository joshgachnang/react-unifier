/*
MIT License

Copyright (c) 2018 hkd987

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Taken from https://github.com/hkd987/Fencery
*/

export interface GeoFence {
  name: string;
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
}

export class Fence {
  data: GeoFence[];
  constructor(data: GeoFence[]) {
    this.data = data;
  }

  static toRadians(val: number) {
    return (val * Math.PI) / 180;
  }

  static pointInsideCircle(point: any, circle: any) {
    const {center} = circle;
    const distance = this.distanceBetween(point, center);
    return distance <= circle.radius; // Use '<=' if you want to get all points in the border
  }

  static distanceBetween(point1: any, point2: any) {
    const radius = 6371e3; // metres
    const φ1 = this.toRadians(point1.latitude);
    const φ2 = this.toRadians(point2.latitude);
    const Δφ = this.toRadians(point2.latitude - point1.latitude);
    const Δλ = this.toRadians(point2.longitude - point1.longitude);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
  }

  isInside(check: {latitude: number; longitude: number}) {
    const dataPoints = this.data;
    const temp = [];
    for (const point in dataPoints) {
      temp.push(
        Fence.pointInsideCircle(check, {
          center: dataPoints[point].center,
          radius: dataPoints[point].radius,
        })
      );
    }
    return temp.includes(true);
  }
}
