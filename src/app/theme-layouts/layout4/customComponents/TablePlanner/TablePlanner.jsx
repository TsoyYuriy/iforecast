import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TablePlanner.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import format from 'date-fns/format';
import Button from '../UI/Button/Button';
import { removeDate } from 'src/app/main/planner/store/plannerSlice'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const TablePlanner = () => {

	const {dataInfo, tableHeader} = useSelector(state => state.fuse.planner);
	const dispatch = useDispatch();

	return (
		<Box sx={{overflow: 'auto'}}>
			<Paper sx={{ width: '100%', overflow: 'hidden', display: "table", tableLayout: "fixed" }}>
				<TableContainer sx={{height: '300px'}}>
					<Table 
						stickyHeader
						aria-label="sticky table"
						sx={{
							"& .MuiTableRow-root:hover": {
								backgroundColor: "#fff7f2"
							}
						}}
					>
						<TableHead className='TableHead' sx={{background: '#F4FCFE'}}>
							<TableRow>
								{
									tableHeader.map( (col, i) => {
										return <TableCell key={i} align="center">
															<Typography>
																{col}
															</Typography>
													</TableCell>
									})
								}
							</TableRow>
						</TableHead>
						

						<TableBody>
							{
								dataInfo.map( (row, i) => {
									return <TableRow key={i}>
													
													<TableCell component="th" scope="row" align="center">
														<Typography className="" color="text.secondary">
															{row.id}
														</Typography>
													</TableCell>

													<TableCell component="th" scope="row" align="center">
														<Typography className="" color="text.secondary">
															{format(new Date(row.dateOfSend), 'dd.MM.yyyy')}
														</Typography>
													</TableCell>

													<TableCell component="th" scope="row" align="center">
														<Typography className="" color="text.secondary">
															{`${format(new Date(row.forecastStart), 'dd.MM.yyyy')} - ${format(new Date(row.forecastEnd), 'dd.MM.yyyy')}`}
														</Typography>
													</TableCell>

													<TableCell component="th" scope="row" align="center">
														<Typography className="" color="text.secondary">
															{row.status}
														</Typography>
													</TableCell>

													<TableCell component="th" scope="row" align="center">
														<Button
															btnOnClick={() => dispatch(removeDate(row.id))}	
														>
															<FuseSvgIcon className="text-48" size={20} color="action">feather:trash-2</FuseSvgIcon>
														</Button>
													</TableCell>

												</TableRow>
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>

	)
}

export default TablePlanner;
