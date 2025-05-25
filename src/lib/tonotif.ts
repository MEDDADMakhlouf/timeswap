type NotificationItemProps = {
    id: number;
    type: "pending" | "accepted" | "rejected";
    title: string;
    message: string;
    time: string; // You may need to get this from server or generate locally
};

function mapSwapRequestToNotification(item: SwapRequest): NotificationItemProps {
    const teacher = item.from_session.teacher;
    const fromModule = item.from_session.module;
    const toModule = item.to_session.module;

    return {
        id: item.id,
        type: item.status as "pending" | "accepted" | "rejected",
        title: `Swap Request ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`,
        message: `Prof. ${teacher.last_name} requested to swap ${fromModule} with ${toModule}. Message: ${
            item.message || "No message provided."
        }`,
        time: new Date().toLocaleString(),
    };
}
