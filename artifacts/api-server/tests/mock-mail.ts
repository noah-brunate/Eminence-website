export const sent: Array<Record<string, unknown>> = [];
export default {
  createTransport: () => ({
    sendMail: async (message: Record<string, unknown>) => {
      sent.push(message);
      return { accepted: [message.to], messageId: "local-test-only" };
    },
  }),
};
