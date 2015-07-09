using System;
using log4net;
using log4net.Core;
using log4net.Appender;

namespace log4netEventBroadcast
{
	class EventAppender : AppenderSkeleton
	{
		protected override void Append(LoggingEvent loggingEvent)
		{
			// we are coupling the info with the status indication, maybe we can consider using other levels, such as Notice to indicate progress
			if (loggingEvent.Level == Level.Info)
			{
				BroadcastEventService.Instance.Broadcast(new BroadcastEventArgs
					{
						DataTime = loggingEvent.TimeStamp,
						Level = loggingEvent.Level.ToString(),
						LoggerName = loggingEvent.LoggerName,
						ThreadName = loggingEvent.ThreadName,
						Message = loggingEvent.MessageObject.ToString(),
					});
			} 

		}
	}
}

