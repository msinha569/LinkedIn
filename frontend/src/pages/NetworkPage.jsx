import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";
import { useConnections } from "../services/useConnections";
import { useAuth } from "../services/useAuth";

const NetworkPage = () => {
    const {authUser} = useAuth()
    const {connections, connectionRequests} = useConnections()
	console.log(connectionRequests);
	
	return (
		<div className='flex items-center justify-center flex-col lg:items-start lg:grid lg:grid-cols-4 gap-6 p-4'>
			<div className='col-span-1 lg:col-span-1 w-fit   lg:w-full'>
				<Sidebar user={authUser} />
			</div>
			<div className='col-span-1 lg:col-span-3 min-w-[60vw]'>
				<div className='bg-secondary rounded-lg shadow p-12 mb-6'>
					<h1 className='text-2xl font-bold mb-6'>My Network</h1>

					{connectionRequests.length > 0 ? (
						<div className='mb-8'>
							<h2 className='text-xl font-semibold mb-2'>Connection Request</h2>
							<div className='space-y-4'>
								{connectionRequests.map((request) => (
									<FriendRequest key={request.id} request={request} />
								))}
							</div>
						</div>
					) : (
						<div className='bg-white rounded-lg shadow p-6 text-center mb-6'>
							<UserPlus size={48} className='mx-auto text-gray-400 mb-4' />
							<h3 className='text-xl font-semibold mb-2'>No Connection Requests</h3>
							<p className='text-gray-600'>
								You don&apos;t have any pending connection requests at the moment.
							</p>
							<p className='text-gray-600 mt-2'>
								Explore suggested connections below to expand your network!
							</p>
						</div>
					)}
					{connections?.data?.length > 0 && (
						<div className='mb-8'>
							<h2 className='text-2xl font-bold mb-4'>My Connections</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{connections.data.map((connection) => (
									<UserCard key={connection._id} user={connection} isConnection={true} />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default NetworkPage;