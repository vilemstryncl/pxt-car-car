radio.setGroup(15);
radio.setTransmitSerialNumber(true)
let y = 0
let x = 0
let turn = 0
let speed = 0

function controlServo(xTilt: number, yTilt: number) {
    speed = Math.map(yTilt, -1023, 1023, -200, 200)
    speed = Math.constrain(speed, 0, 200)
    turn = Math.map(xTilt, -1023, 1023, -200, 200)
    turn = Math.constrain(turn, 0, 200)
    if (yTilt < -10) {
        // vpřed
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt + xTilt / 2)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, yTilt - xTilt / 2)
    } else if (yTilt > 10) {
        // zpět
        PCAmotor.MotorRun(PCAmotor.Motors.M1, yTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt)
    } else {
        // stát
        PCAmotor.MotorStopAll()
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
    } else if (name == "y") {
        y = value
    }
    controlServo(x, y)
})
radio.onReceivedString(function (string) {
    if (string == "Stop") {
        PCAmotor.MotorStopAll()
        basic.pause(1000)
    }
})

