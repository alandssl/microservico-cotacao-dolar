import type { ScheduledEvent } from "aws-lambda"
import { handler } from "./handler.js"


const test = {} as ScheduledEvent;

await handler(test);



