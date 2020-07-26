const JsonResponse = (status: number, message: string, result: any) => {
	return { status, message, result };
};

export { JsonResponse };
