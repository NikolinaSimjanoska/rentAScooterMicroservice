const Scooter = require('../models/scooter');

async function getAllScooters(search, reqPage, reqLimit) {
	let options = {};

	if (search) {
		options = {
			...options,
			$or: [
				{color: new RegExp(search.toString(), 'i')},
				{manufacturer: new RegExp(search.toString(), 'i')},
				{size: new RegExp(search.toString(), 'i')},
				{isAvailable: new RegExp(search.toString(), 'i')}
			]
		}
	}

	let total = Scooter.countDocuments(options);
	let page = parseInt(reqPage) || 1;
	let limit = parseInt(reqLimit) || parseInt(await total);
	let last_page = Math.ceil(parseInt(await total)/limit);
	if (last_page < 1 && total > 0) {
		last_page = 1
	}

	try {
		const scooters = await Scooter.find(options).skip((page - 1) * limit).limit(limit);
		return {
			success: true,
			data: scooters,
			total: (await total).toString(),
			page: (await page).toString(),
			last_page: (await last_page).toString(),
		};
	} catch (err) {
		return { success: false, message: "Scooters not found" };
	}
}

async function getScooterById(id) {
	let scooter;
	try {
		scooter = await Scooter.findById(id);
		if (scooter == null) {
			return { success: false, message: 'Cannot find scooter' };
		}
	} catch (err) {
		return { success: false, message: err.message };
	}

	return {
		success: true,
		data: scooter,
	};
}

async function addScooter(body) {
	const scooter = new Scooter(body);

	try {
		const newScooter = await scooter.save();
		return {
			success: true,
			data: newScooter,
		};
	} catch (err) {
		return { success: false, message: "Failed to add scooter" };
	}
}

async function updateScooter(id, color = null, manufacturer = null, size = null, isAvailable = null) {
	let scooter;
	try {
		scooter = await Scooter.findById(id);
		if (scooter == null) {
			return { success: false, message: 'Cannot find scooter' };
		}
		if (color != null) {
			scooter.color = color
		}
		if (manufacturer != null) {
			scooter.manufacturer = manufacturer
		}
		if (size != null) {
			scooter.size = size
		}
		if (isAvailable != null) {
			scooter.isAvailable = scooter
		}
		try {
			const updatedScooter = await scooter.save()
			return {
				success: true,
				data: updatedScooter,
				message: "Scooter updated successfully"
			};
		} catch (err) {
			return { sucess: false ,message: "Failed to update scooter" };
		}
	} catch (err) {
		return { success: false, message: err.message };
	}
}

async function removeScooter(id) {
	let scooter;
	try {
		scooter = await Scooter.findById(id);
		if (scooter == null) {
			return { success: false, message: 'Cannot find scooter' };
		}

		try {
			await scooter.remove()
			return {
				success: true,
				message: 'Deleted scooter'
			};
		} catch (err) {
			return { success: false ,message: err.message };
		}
	} catch (err) {
		return { success: false, message: err.message };
	}
}

module.exports = {
	getAllScooters,
	getScooterById,
	addScooter,
	updateScooter,
	removeScooter
}
